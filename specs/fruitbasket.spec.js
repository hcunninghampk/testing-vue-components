import  FruitBasket from '@/fruit-basket'
import { mount } from '@vue/test-utils'

/*Using the fruit-basket template to go over how to traverse the mounted DOM rep of the Vue instance,  find elements in
 the mounted DOM, and how to fire events, like change or click, in the mounted DOM.

 The objective is to add fruits to the fruit basket using only the mounted DOM -- no direct calling of any meths --
 since care about the bindings being set up correctly. */

it('should add fruit to the basket with the DOM', async () => {
    const wrapper = mount(FruitBasket);

    //What DOM els do we care about? The Input and the Btn
    /* Wrapper has a find meth, uses CSS selectors to find els. Returns Wrapper of first DOM node or Vue component
    matching selector. BUT, this meth is deprecated, of course.  Use findComponent() instead, whch also rtns Wrapper of
     first matching Vue component.*/
    //const input = wrapper.find('input');
    const textInput = wrapper.find('input[type="text"]');
    const addButton = wrapper.find('button');

    //Using .element can access the actual HTML el
    //input.element.value = 'banana'; // This assignment doesn't work.
    await textInput.setValue('banana');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.fruit).toBe('banana');
});