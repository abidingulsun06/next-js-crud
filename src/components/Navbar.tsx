import { Container, Menu, Button, Item } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Item onClick={() => router.push("/")}>
          <Image
            width="30"
            height="30"
            src="https://react.semantic-ui.com/logo.png"
            alt="nextjs logo"
          />
        </Item>

        <Menu position="right">
          <Item>
            <Button onClick={() => router.push("/tasks/new")} primary>
              New Task
            </Button>
          </Item>
        </Menu>

        <Menu >
          <Item>
            <Button onClick={() => router.push("/employees/new")} primary>
              Add Employee
            </Button>
          </Item>
        </Menu>
      </Container>
    </Menu>
  );
};
