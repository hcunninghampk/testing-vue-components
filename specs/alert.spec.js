import AlertMessage from '@/alert-message'
import { mount } from '@vue/test-utils'

//Use Jest fake timers to cause nothing to happen by default and check the value of the counter
jest.useFakeTimers();

describe('Lifecycle Method Tests', () => {

    test('mounted() should assign an interval', () => {
        const wrapper = mount(AlertMessage);
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.vm.interval).not.toBe(undefined);
    });

    test('counter works', () => {
        const wrapper = mount(AlertMessage);
        expect(wrapper.vm.counter).toBe(0);

        //when user jest.useFakeTimers(), can control time, like advance it
        //to advance the counter by 1:
        jest.advanceTimersByTime(1000);
        expect(wrapper.vm.counter).toBe(1);
    });

    /*Want to ensure the destroy lifecycle meths get invoked correctly, since it's called from within the code. */
    test('instance gets destroyed', () => {
        /* Spies will be handy here.  A spy let's you watch a fcn and tells if it's called or not. IMPORTANT: Set up
        spies BEFORE mounting any Vue instance from the wrapper b/c Vue transforms the comp into the VM obj.  */
        const beforeDestroyedSpy = jest.spyOn(AlertMessage, 'beforeDestroy');
        const wrapper = mount(AlertMessage);

        //1st, Set the counter to the last second of the timer
        wrapper.vm.counter = wrapper.vm.timer - 1;

        //Next, advance the timer by 1 sec to the end of the timer when the lifecycle meths should be called
        jest.advanceTimersByTime(1000);
        expect(beforeDestroyedSpy).toHaveBeenCalled();
    });
});
