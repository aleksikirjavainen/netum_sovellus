import { Person } from "../Interfaces";

interface Props {
  person: Person;
  deletePerson(personId: number): void;
  editPerson(
    idToEdit: number,
    fnameToedit: string,
    lnameToEdit: string,
    ageToedit: number
  ): void;
}

// Span values have ?:s to avoid crashes with undefined
const People = ({ person, deletePerson, editPerson }: Props) => {
    return (
      <div className="person">
        <div className="content">
          <span>{person?.fname}</span>
          <span>{person?.lname}</span>
          <span>{person?.age}</span>
        </div>
        <button onClick={() => deletePerson(person?.id)}>Delete</button>
        <button
          onClick={() =>
            editPerson(person.id, person.fname, person.lname, person.age)
          }
        >
          Edit
        </button>
      </div>
    );
};

export default People;
