// @packages
import { Dispatch, SetStateAction } from "react";

// @scripts
import Patient from "./Patient";

// @interfaces
import { PatientList } from "../App";

interface IPatientListProps {
  deletePatient?: (id: string) => void;
  patientList: PatientList[];
  setPatientSelected: Dispatch<SetStateAction<PatientList>>;
}

const PatientListForm = ({
  patientList,
  setPatientSelected,
  deletePatient,
}: IPatientListProps) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-scroll">
      {patientList && !!patientList.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patient List</h2>
          <p className="text-xl mt-5 mb-10 text-center">Manage Your Patients</p>
          {patientList.map((patient) => (
            <Patient
              deletePatient={deletePatient}
              key={patient.id}
              patient={patient}
              setPatientSelected={setPatientSelected}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">Patient List</h2>
          <p className="text-xl mt-5 mb-10 text-center">No Patients</p>
        </>
      )}
    </div>
  );
};

export default PatientListForm;
