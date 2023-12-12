// @packages
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// @scripts
import Error from "./Error";
import { PatientList, initialPatient } from "../App";

interface IFormProps {
  patientSelected: PatientList;
  patients: PatientList[];
  setPatientSelected: Dispatch<SetStateAction<PatientList>>;
  setPatients: Dispatch<SetStateAction<PatientList[]>>;
}

const Form = ({
  patientSelected,
  patients,
  setPatientSelected,
  setPatients,
}: IFormProps) => {
  const [error, setError] = useState<boolean>(false);
  const [patient, setPatient] = useState<PatientList>(initialPatient);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const generateId = (): string => Math.random().toString(36).slice(2);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isErrorSubmitted = Object.keys(patient).every((key) => patient[key as keyof PatientList]?.trim());

    if (!isErrorSubmitted) {
      setError(true);
      return;
    } else {
      const newPatient = { ...patient, id: generateId() };

      if (patient.id) {
        newPatient.id = patient.id;

        const updatedPatients = patients.map((patient) => {
          if (patient.id === newPatient.id) {
            return newPatient;
          }

          return patient;
        });

        setPatients(updatedPatients);
        setPatientSelected(initialPatient);
      } else {
        setPatients([...patients, newPatient]);
      }

      setPatient(initialPatient);
      setError(false);
    }
  };

  useEffect(() => {
    if (Object.keys(patientSelected).length) {
      setPatient(patientSelected);
    }
  }, [patientSelected]);

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Patient Follow Up Form
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">Add Patient</p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        {error && <Error message="All fields are required" />}

        <div className="mb-5">
          <label
            htmlFor="petName"
            className="block text-gray-700 uppercase font-bold"
          >
            Pet Name
          </label>
          <input
            className="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
            id="petName"
            name="petName"
            onChange={handleChange}
            placeholder="Pet Name"
            type="text"
            value={patient.petName}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="ownerName"
            className="block text-gray-700 uppercase font-bold"
          >
            Owner Name
          </label>
          <input
            className="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
            id="ownerName"
            name="ownerName"
            onChange={handleChange}
            placeholder="Owner Name"
            type="text"
            value={patient.ownerName}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            className="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Owner Email"
            type="email"
            value={patient.email}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="departureDate"
            className="block text-gray-700 uppercase font-bold"
          >
            Departure Date
          </label>
          <input
            className="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
            id="departureDate"
            name="departureDate"
            onChange={handleChange}
            placeholder="Departure Date"
            type="date"
            value={patient.departureDate}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 uppercase font-bold"
          >
            Symptoms
          </label>
          <textarea
            className="w-full mt-2 p-2 border-2 placeholder-gray-400 rounded-md"
            id="symptoms"
            name="symptoms"
            onChange={handleChange}
            placeholder="Symptoms"
            value={patient.symptoms}
          />
        </div>

        <input
          type="submit"
          value={patientSelected.id ? "Edit Patient" : "Add Patient"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
};

export default Form;
