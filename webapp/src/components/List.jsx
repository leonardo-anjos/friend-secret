import React, { PureComponent } from "react";
import { Button, Input, Table, Divider, message, Icon } from "antd";
import { FormPerson } from "./Form";
import { index } from "../services/api";
import { ActionEdit } from "./UI/Edit";
import { ActionRemove } from "./UI/Remove";
import { ActionDraw } from "./UI/Draw";

const Search = Input.Search;

export class ListPerson extends PureComponent {
  state = {
    persons: [],
    searchText: null,
    visible: false,
    confirmLoading: false,
    filteredData: [],
    searchInput: "",
    loading: true,
    isEditing: false,
    currentPersonEdit: null,
    status: false,
    drawerPerson: []
  };

  render() {
    return (
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px"
        }}
      >
        {this.renderOptions()}
        {this.renderSearch()}
        {this.renderTable()}
      </div>
    );
  }

  componentDidMount() {
    this.getAllPersons();
  }

  getAllPersons = async () => {
    const response = await index.get("/persons");
    this.setState({
      persons: response.data,
      drawerPerson: response.data,
      loading: false
    });
  };

  renderOptions() {
    return (
      <div style={{ paddingBottom: "20px" }}>
        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" /> Novo
        </Button>
        <FormPerson
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
        />
      </div>
    );
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    this.setState({ visible: false });
  };

  handleSubmit = () => {
    const { isEditing } = this.state;
    const { form } = this.formRef.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (isEditing) {
        this.handleUpdate(values);
      } else {
        this.addPerson(values);
      }

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  renderSearch() {
    return <Search placeholder="Buscar" onChange={this.handleSearch} />;
  }

  handleSearch = event => {
    const val = event.target.value;
    this.setState({ searchInput: val }, () => this.globalSearch());
  };

  globalSearch = () => {
    const { searchInput, persons } = this.state;
    let filteredData = persons;

    filteredData = filteredData.filter(value => {
      return value.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    this.handleSetFilteredData(filteredData);
  };

  handleSetFilteredData = filteredData => {
    this.setState({ filteredData });
  };

  handleSetSearchInput = searchInput => {
    this.setState({ searchInput });
  };

  renderTable() {
    const { persons, filteredData, searchInput, loading } = this.state;
    const dataSource = searchInput.length ? filteredData : persons;

    const iconYes = (
      <Icon
        type="check-circle"
        style={{
          fontSize: 20,
          color: "#009900"
        }}
      />
    );

    const iconNot = (
      <Icon
        type="check-circle"
        style={{
          fontSize: 20,
          color: "#990000"
        }}
      />
    );

    const columns = [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Sorteado",
        dataIndex: "status",
        key: "status",
        render: (_, person) => (person.status === true ? iconYes : iconNot)
      },
      {
        title: "Ações",
        key: "actions",
        render: (_, person) =>
          person.status === true ? (
            <span>
              <ActionEdit onClick={() => this.handleEdit(person)} />
              <Divider type="vertical" />
              <ActionRemove onClick={() => this.handleRemove(person)} />
            </span>
          ) : (
            <span>
              <ActionEdit onClick={() => this.handleEdit(person)} />
              <Divider type="vertical" />
              <ActionRemove onClick={() => this.handleRemove(person)} />
              <Divider type="vertical" />
              <ActionDraw onClick={() => this.handleDraw(person)} />
            </span>
          )
      }
    ];

    return (
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        locale={{
          emptyText: "Nenhum registro encontrado"
        }}
      />
    );
  }

  handleDraw = async person => {
    let { drawerPerson } = this.state;
    console.log("seleted person", person.name);

    const randomPerson =
      drawerPerson[Math.floor(Math.random() * drawerPerson.length)];
    console.log("drawer person - to remove", randomPerson.name);

    const index0 = drawerPerson.indexOf(randomPerson);
    if (index0 > -1) {
      let result = drawerPerson.filter(dp => dp._id !== randomPerson._id);
      drawerPerson.splice(index0, 1);
      this.setState({ drawerPerson: result });
    }

    console.log("restantes", drawerPerson);

    // update status friendSecret
    await index.patch(`/persons/${person._id}`, {
      status: true,
      name: person.name,
      email: person.email,
      friendSecret: randomPerson.name
    });
    message.success(`Detalhes enviado para ${person.email}`);
    this.getAllPersons();
  };

  addPerson = async values => {
    await index.post("/persons", values);
    message.success("Adicionado com sucesso!");
    this.getAllPersons();
  };

  handleEdit = async values => {
    this.setState({ isEditing: true });
    this.setState({ currentPersonEdit: values._id });
    this.showModal();

    const { form } = this.formRef.props;

    form.setFieldsValue({
      name: `${values.name || ""}`,
      email: `${values.email || ""}`,
      friendSecret: `${values.friendSecret || ""}`
    });
  };

  handleRemove = async person => {
    await index.delete(`/persons/${person._id}`);
    message.success("Removido com sucesso!");
    this.getAllPersons();
  };

  handleUpdate = async person => {
    let { currentPersonEdit } = this.state;
    await index.patch(`/persons/${currentPersonEdit}`, person);
    message.success("Atualizado com sucesso!");
    this.getAllPersons();
  };
}
