import React, { FC, useState } from "react";
import { authService } from "../../../services/Auth.Service";
import { IProps } from "../../../models/IProps";
import Helmet from "react-helmet";
import { GetAppName } from "../../../context/App";
import LevelClass from "../partials/LevelClass";
import SwitchInput from "../../partials/SwitchInput";
import DayTimetable from "./DayTimetable";

const SubjectAttendance: FC<IProps> = ({ history }) => {
  const [showFilter, SetShowFilter] = useState<boolean>(true);
  const [dayTimetable, SetDayTimetable] = useState<boolean>();
  const [showAttendanceReport, SetShowAttendanceReport] = useState<boolean>();
  const [attInput, SetAttInput] = useState<any>();
  const [activeRecord, SetActiveRecord] = useState<any>();
  // Get  School of logged in user
  const { school } = authService.GetUser();

  // Check if user is authenticated
  if (!authService.IsAuthenticated()) {
    history.push("/login");
  }

  return (
    <>
      <Helmet>
        <title>Subject Attendance | {GetAppName()}</title>
      </Helmet>
      <div className="content-i">
        <div className="content-box">
          <div className="element-wrapper">
            <div className="element-actions" style={{ marginTop: "-20px" }}>
              {/* Date Range Filter switch */}
              <SwitchInput
                isOn={showFilter}
                handleToggle={() => {
                  SetShowFilter(!showFilter);
                }}
                label="Show Filter"
              />
            </div>
            <h5 className="element-header">Subject Attendance</h5>
            {!showAttendanceReport && (
              <>
                <div className="row justify-content-center">
                  {showFilter && (
                    <div className="col-12">
                      <div className="element-box">
                        <LevelClass
                          schoolId={school?.id}
                          onLevelChange={(level: any) =>
                            SetAttInput({
                              ...attInput,
                              level: level,
                              current_class: undefined,
                            })
                          }
                          onClassChange={(_class: any) =>
                            SetAttInput({
                              ...attInput,
                              current_class: _class,
                            })
                          }
                          onSubmit={() => {
                            if (attInput?.current_class) {
                              SetDayTimetable(true);
                              SetShowFilter(false);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {dayTimetable && (
                    <div className="col-12">
                      <DayTimetable
                        onTimetableClick={() => {
                          SetShowAttendanceReport(true);
                        }}
                        level={attInput?.level}
                        _class={attInput?.current_class}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {showAttendanceReport && (
              <>
                <div className="row">
                  <div className="col-12">
                    <div className="element-box">worked!</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SubjectAttendance;
