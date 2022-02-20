import { FC, ChangeEvent, useState } from "react";
import "./App.css";
import People from "./components/People";
import { Person } from "./Interfaces";

const App: FC = () => {
  const [id, setId] = useState<number>(0);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [people, setPeople] = useState<Person[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "fname") {
      setFname(event.target.value);
    } else if (event.target.name === "lname") {
      setLname(event.target.value);
    } else {
      setAge(Number(event.target.value));
    }
  };

  const addPerson = (): void => {
    const newPerson = { id: id, fname: fname, lname: lname, age: age };

    setPeople([...people, newPerson]);
    setId(id + 1);
  };

  const deletePerson = (personId: number): void => {
    setPeople(
      people.filter((person) => {
        return person.id !== personId;
      })
    );
  };

  const editPerson = (
    fnameToedit: string,
    lnameToEdit: string,
    ageToedit: number
  ): void => {
    setFname(fnameToedit);
    setLname(lnameToEdit);
    setAge(ageToedit);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            name="fname"
            placeholder="First name"
            value={fname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last name"
            value={lname}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={handleChange}
          />
        </div>
        <button onClick={addPerson}>Add/Edit person</button>
      </div>
      <div className="People">
        {people.map((person: Person, key: number) => {
          return (
            <People
              key={key}
              person={person}
              deletePerson={deletePerson}
              editPerson={editPerson}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
