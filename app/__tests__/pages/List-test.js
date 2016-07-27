const React = require('react-native');
const { View } = React;
 
const utils = require('react-addons-test-utils');
 
jest.dontMock('../../pages/List');
var List = require('../../pages/List');
 
describe('List', () => {
    let list;
 
    function renderScreen(props, states) {
        const renderer = utils.createRenderer();
        renderer.render(<List {...props || {}}/>);
        const instance = renderer._instance._instance;
        instance.setState(states || {});
        const output = renderer.getRenderOutput();
 
        return {
            output,
            instance
        };
    }

    it('should display the text view if data was not loaded', () => {
        list = renderScreen();
        const {output} = list;
        expect(output.type).toEqual(View);
        expect(output.props.children.props.children).toBe("You don't have any Notes.");
    });
 
});