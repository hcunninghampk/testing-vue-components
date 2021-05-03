import Temperature from '@/temperature'
import {mount} from '@vue/test-utils'

describe('Computed and Watched Properties Tests', () => {

    test('celsius property', () => {
        //const wrapper = mount(Temperature);
        const {vm} = mount(Temperature);
        //expect(wrapper.vm.celsius).toBe(0);
        expect(vm.celsius).toBe(0);

        //wrapper.setData({degrees: 23}); // Use setData() when you're testing a whole template, as templates get
        // updated async

        //But when testing a computed property, it gets updated rt away, no async. So, the prop can be set and tested and
        // directly.  Makes fcnal tests cleaner.
        //wrapper.vm.degrees = 23;
        vm.degrees = 23;
        //expect(wrapper.vm.celsius).toBe(23);
        expect(vm.celsius).toBe(23);
    });

    test('fahrenheit property converted from celsius', () => {
        const {vm} = mount(Temperature);
        expect(vm.fahrenheit).toBe(32);

        vm.degrees = 16;
        expect(vm.fahrenheit).toBe(60.8);
    });

    test('temperature watcher method should update temperature', async () => {
        const wrapper = mount(Temperature, {propsData: {temp: 40}});
        const {vm} = wrapper;
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');

        wrapper.setProps({temp: 20});
        await wrapper.vm.$nextTick();
        console.log("Current degrees: " + vm.degrees + " " + vm.type);
        expect(vm.degrees).toBe(20);
        expect(vm.type).toBe('celsius');
    });

    //can suffix test with .skip or prefix with x to skip, but then lists output as pending test
    test('temperature watcher method should update temperature and degrees type', async () => {
        //set the default data to be 40 degrees celsius
        const wrapper = mount(Temperature, {propsData: {temp: 40}});
        const {vm} = wrapper;
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');

        //setProps() allows you to set the props while the comp is mounted already
        //Sets Wrapper vm props and forces update.
        //wrapper.setProps({temp: '50f'});//This setProps() doesn't work.  Per Vue docs: "setProps could be called only for
        // top-level component, mounted by mount or shallowMount".  To change the properties in the Vue instance, you
        // need to use propsData: "pass a propsData object, which will initialize the Vue instance with passed values."
        //wrapper.setProps({watch: '50f'});//This doesn't work either.

        /*wrapper.setProps({
            watch: {
                temp: {handler: '50f'}
            }
        });*/  //this doesn't work either

        //wrapper.setData({type: 'fahrenheit', degrees: 50}); //this works, but does not test the watched temperature property

        /*To get this to work, must set the test function as an async fcn.  See signature above.  Then, must use/await
        nextTick() to force a DOM update to override the watch property 'immediate', which is set to true, which only
        updates the DOM once.  */
        wrapper.setProps({temp: '50f'});
        await wrapper.vm.$nextTick();

        console.log("Current degrees: " + vm.degrees + " " + vm.type);
        expect(vm.degrees).toBe(50);
        expect(vm.type).toBe('fahrenheit');
    });

    test('temperature watcher method should simply return when a null value is passed in', async () => {
        const wrapper = mount(Temperature, {propsData: {temp: 40/*, watch: '40c'*/}});
        const {vm} = wrapper;
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');

        wrapper.setProps({temp: null});
        await wrapper.vm.$nextTick();
        console.log("Current degrees: " + vm.degrees + " " + vm.type);
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');
    });

    test('temperature watcher method should simply return when an empty String is passed in', async () => {
        const wrapper = mount(Temperature, {propsData: {temp: 40/*, watch: '40c'*/}});
        const {vm} = wrapper;
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');

        wrapper.setProps({temp: ''});
        await wrapper.vm.$nextTick();
        console.log("Current degrees: " + vm.degrees + " " + vm.type);
        expect(vm.degrees).toBe(40);
        expect(vm.type).toBe('celsius');
    });


});