import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Employees } from "src/interfaces/Employees";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
    username: "",
    name: "",
    lastname: "",
};

const NewPage = (): JSX.Element => {
    const [employee, setEmployee] = useState<Employees>(inititalState);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createTask = async (employees: Employees) =>
        await fetch("http://localhost:3000/api/employees", {
            method: "POST",
            body: JSON.stringify(employee),
            headers: {
                "Content-Type": "application/json",
            },
        });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        try {
            createTask(employee);
            setEmployee(inititalState);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
        setEmployee({ ...employee, [name]: value });

    const loadTask = async (id: string) => {
        const res = await fetch("http://localhost:3000/api/employees/" + id);
        const employee = await res.json();
        setEmployee({ username: employee.username, name: employee.name, lastname: employee.lastname });
    };



    useEffect(() => {
        if (typeof router.query.id === "string") loadTask(router.query.id);
    }, [router.query]);

    return (
        <Layout>
            <Grid
                centered
                columns={3}
                verticalAlign="middle"
                style={{ height: "70%" }}
            >
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        placeholder="Write a username"
                                        name="username"
                                        onChange={handleChange}
                                        value={employee.username}
                                        autoFocus
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="description">Name:</label>
                                    <input
                                         type="text"
                                        placeholder="Write a name"
                                        name="name"
                                        onChange={handleChange}
                                        value={employee.name}
                                        autoFocus
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label htmlFor="description">Lastname:</label>
                                    <input
                                        type="text"
                                        placeholder="Write a lastname"
                                        name="lastname"
                                        onChange={handleChange}
                                        value={employee.lastname}
                                        autoFocus
                                    />
                                </Form.Field>

                                <Button primary loading={loading}>
                                    <Icon name="save" />
                                    Save
                                </Button>

                            </Form>
                        </Card.Content>
                    </Card>


                </Grid.Column>
            </Grid>


        </Layout>
    );
};

export default NewPage;
