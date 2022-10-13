import renderer from "react-test-renderer";
import App from "./App";

describe('App snapshot test', () => {
    test("it renders a snapshot", async () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
