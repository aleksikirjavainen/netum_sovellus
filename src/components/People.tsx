import React from "react";
import { Person } from "../Interfaces";

interface Props {
  person: Person;
  deletePerson(personId: number): void;
  editPerson(
    fnameToedit: string,
    lnameToEdit: string,
    ageToedit: number
  ): void;
}

const People = ({ person, deletePerson, editPerson }: Props) => {
  return (
    <div className="List">
      <div className="content">
        <span>{person.fname}</span>
        <span>{person.lname}</span>
        <span>{person.age}</span>
      </div>
      <button onClick={() => deletePerson(person.id)}>Delete</button>
      <button onClick={() => editPerson(person.fname, person.lname, person.age)}>Edit</button>
    </div>
  );
};

export default People;
