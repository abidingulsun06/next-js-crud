import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import { Employees } from "src/interfaces/Employees";

interface Props {
  employees: Employees[];
}

export const EmployeeList = ({ employees = [] }: Props) => {
  const router = useRouter();

  return (
    <Card.Group itemsPerRow={4}>
      {employees.map((employee) => (
        <Card
          onClick={() => router.push(`/employees/edit/${employee.id}`)}
          key={employee.id}
        >
          <Card.Content>
            <Card.Header>{employee.username}</Card.Header>
            {employee.created_on && (
              <Card.Meta>
                {new Date(employee.created_on).toLocaleDateString()}
              </Card.Meta>
            )}
            <Card.Description>{employee.name}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
