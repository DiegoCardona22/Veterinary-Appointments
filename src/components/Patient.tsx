// @packages
import { Dispatch, SetStateAction } from "react";

// @scripts
import { PatientList } from "../App";

interface IPatientProps {
  deletePatient?: (id: string) => void;
  patient: PatientList;
  setPatientSelected: Dispatch<SetStateAction<PatientList>>;
}

const Patient = ({
  deletePatient,
  patient,
  setPatientSelected,
}: IPatientProps) => {
  const { departureDate, email, id, ownerName, petName, symptoms } = patient;

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold text-gray-700 mb-3 uppercase">
        Pet Name: {""}
        <span className="font-normal normal-case">{petName}</span>
      </p>

      <p className="font-bold text-gray-700 mb-3 uppercase">
        Owner Name: {""}
        <span className="font-normal normal-case">{ownerName}</span>
      </p>

      <p className="font-bold text-gray-700 mb-3 uppercase">
        Owner Email: {""}
        <span className="font-normal normal-case">{email}</span>
      </p>

      <p className="font-bold text-gray-700 mb-3 uppercase">
        Departure Date: {""}
        <span className="font-normal normal-case">{departureDate}</span>
      </p>

      <p className="font-bold text-gray-700 mb-3 uppercase">
        Symptoms: {""}
        <span className="font-normal normal-case">{symptoms}</span>
      </p>

      <div className="flex justify-between">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 py-2 px-10 uppercase font-bold text-white rounded-md transition-all"
          type="button"
          onClick={() => setPatientSelected(patient)}
        >
          Edit Patient
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 py-2 px-10 uppercase font-bold text-white rounded-md transition-all"
          type="button"
          onClick={() => deletePatient && deletePatient(id!)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Patient;
