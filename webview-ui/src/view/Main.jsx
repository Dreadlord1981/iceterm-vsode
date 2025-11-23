import Container from "../components/Container";

function Main(props) {
	return (
		<Container>
			{props.children}
		</Container>
	)
}

export default Main;