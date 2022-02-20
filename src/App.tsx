import { FC, ChangeEvent, useState } from "react";
import "./App.css";
import People from "./components/People";
import { Person } from "./Interfaces";

const App: FC = () => {
  // id state is used for giving every person a unique id
  const [id, setId] = useState<number>(0);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [people, setPeople] = useState<Person[]>([]);
  // the idToEdit is used if "edit mode" is enabled and contains the id of the person being updated
  // it is defaulted to -1 because ids start at 0
  const [idToEdit, setIdToEdit] = useState(-1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "fname") {
      setFname(event.target.value);
    } else if (event.target.name === "lname") {
      setLname(event.target.value);
    } else {
      setAge(Number(event.target.value));
    }
  };

  // the addPerson function is also used in editing a user. The same fields are used to edit
  // and add people
  const addOrUpdatePerson = (): void => {
    if (fname === "" || lname === "") {
      console.log("Empty fields not accepted");
      return;
    }
    const newPerson = { id: id, fname: fname, lname: lname, age: age };
    // edit variable is for checking if edit mode is on
    var edit = false;
    // for loop to check if any persons id matches the id of the person being updated
    // if a match is found, edit mode is turned on
    for (var i = 0; i <= id; i++) {
      if (idToEdit === i) {
        newPerson.id = idToEdit;
        people[i] = newPerson;
        setPeople([...people]);
        setFname(" ");
        setLname(" ");
        setAge(0);
        setIdToEdit(-1);
        console.log("edit " + idToEdit);
        edit = true;
        break;
      }
    }
    // the add part of the function is skipped if edit mode is on
    if (edit === false) {
      setPeople([...people, newPerson]);
      setFname(" ");
      setLname(" ");
      setAge(0);
      console.log("add " + id);
      // id state is increased so that the next will have a unique id
      setId(id + 1);
    }
  };

  const deletePerson = (personId: number): void => {
    setPeople(
      people.filter((person) => {
        return person?.id !== personId;
      })
    );
    console.log("delete " + personId)
  };

  // the editPerson function fills the input fields with the selected persons info
  // and makes the next press of the add button edit the person
  const editPerson = (
    idToEdit: number,
    fnameToedit: string,
    lnameToEdit: string,
    ageToEdit: number
  ): void => {
    setIdToEdit(idToEdit);
    setFname(fnameToedit);
    setLname(lnameToEdit);
    setAge(ageToEdit);
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
        <button onClick={addOrUpdatePerson}>Add/Edit person</button>
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
