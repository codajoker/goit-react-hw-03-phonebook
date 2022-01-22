import { Component } from "react";
import { Section, Form, ListContact, Filter } from "./components";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };
  addContact = (data) => {
    if (
      this.state.contacts.find((contact) => {
        return (
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
        );
      })
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState({
        contacts: [
          { name: data.name, id: nanoid(), number: data.number },
          ...this.state.contacts,
        ],
      });
    }
  };
  addFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  findContact = () => {
    const filterContact = this.state.contacts.filter((contact) => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });
    return filterContact;
  };
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };
  componentDidMount() {
    const local = localStorage.getItem("contacts");
    const parse = JSON.parse(local);
    this.setState({ contacts: parse });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log(123);
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contact">
          <Filter onChange={this.addFilter}></Filter>
          <ListContact
            deleteContact={this.deleteContact}
            contacts={this.findContact()}
          ></ListContact>
        </Section>
      </>
    );
  }
}
export default App;
