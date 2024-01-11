import { GetServerSideProps } from "next";
import { Button, Grid } from "semantic-ui-react";
import { Layout } from "src/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { TaskList } from "src/components/tasks/TaskList";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";
import { Employees } from "src/interfaces/Employees";
import { useEffect } from "react";
import { EmployeeList } from "src/components/employees/EmployeeList";

interface Props {
  tasks: Task[];
  employees: Employees[];
}

const Home = ({ tasks, employees }: Props) => {
  const { push } = useRouter();

  useEffect(() => {
    console.log("employees", employees);
  }, [employees])


  return (
    <Layout>
      {tasks.length === 0 ? (
        <Grid
          columns={3}
          centered
          verticalAlign="middle"
          style={{ height: "70%" }}
        >
          <Grid.Row>
            <Grid.Column>
              <div style={{ color: "#eee", textAlign: "center" }}>
                <BiTaskX size="15rem" />
                <h1>No tasks yet</h1>
                <Button onClick={() => push("/tasks/new")}>Create one</Button>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{ color: "#eee", textAlign: "center" }}>
                <BiTaskX size="15rem" />
                <h1>No employees yet</h1>
                <Button onClick={() => push("/employees/new")}>Create Employee</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <TaskList tasks={tasks} />
      )}

      {employees.length > 0 && <EmployeeList employees={employees} ></EmployeeList>}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();


  const res1 = await fetch("http://localhost:3000/api/employees");
  const employees = await res1.json();


  return {
    props: { tasks, employees },
  };
};



export default Home;
