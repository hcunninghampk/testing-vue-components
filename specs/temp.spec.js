import Temperature from '@/temprature'
import { mount } from '@vue/test-utils'

describe('Computed Properties Tests', () => {
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
    })
});