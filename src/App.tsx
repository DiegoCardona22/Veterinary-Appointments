// @packages
import { useState, useEffect } from "react";

// @scripts
import Form from "./components/Form";
import Header from "./components/Header";
import PatientList from "./components/PatientList";

// @constants
export const initialPatient: PatientList = {
  departureDate: "",
  email: "",
  ownerName: "",
  petName: "",
  symptoms: "",
};

// @interfaces
export interface PatientList {
  departureDate: string;
  email: string;
  id?: string;
  ownerName: string;
  petName: string;
  symptoms: string;
}

const App = () => {
  const [patientSelected, setPatientSelected] = useState<PatientList>(initialPatient);
  const [patients, setPatients] = useState<PatientList[]>([]);

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  useEffect(() => {
    const patientsLocalStorage = localStorage.getItem("patients");
    if (patientsLocalStorage) {
      setPatients(JSON.parse(patientsLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patientSelected={patientSelected}
          patients={patients}
          setPatientSelected={setPatientSelected}
          setPatients={setPatients}
        />
        <PatientList
          deletePatient={deletePatient}
          patientList={patients}
          setPatientSelected={setPatientSelected}
        />
      </div>
    </div>
  );
};

export default App;
