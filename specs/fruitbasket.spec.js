import  FruitBasket from '@/fruit-basket'
import { mount } from '@vue/test-utils'

/*Using the fruit-basket template to go over how to traverse the mounted DOM rep of the Vue instance,  find elements in
 the mounted DOM, and how to fire events, like change or click, in the mounted DOM.

 The objective is to add fruits to the fruit basket using only the mounted DOM -- no direct calling of any meths --
 since care about the bindings being set up correctly. */

it('should add fruit to the basket with the DOM', /*async*/ () => {
    const wrapper = mount(FruitBasket);

    //What DOM els do we care about? The Input and the Btn
    /* Wrapper has a find meth, uses CSS selectors to find els. Returns Wrapper of first DOM node or Vue component
    matching selector. BUT, this meth is deprecated, of course.  Use findComponent() instead, whch also rtns Wrapper of
     first matching Vue component.*/
    const textInput = wrapper.find('input[type="text"]');
    const button = wrapper.find('button');
    expect(wrapper.findAll('li').length).toBe(0);

    // -------------  Test the Text Input --------------------------
    //Using .element can access the actual HTML el
    textInput.element.value = 'banana'; // This assignment doesn't work until call .trigger on the el.
    textInput.trigger('input');

    // --OR-- Make test an async fcn, setValue(), and await nextTick(), whch forces a DOM update.
    //await textInput.setValue('banana');
    //await wrapper.vm.$nextTick();
    expect(wrapper.vm.fruit).toBe('banana');

    // -------------  Test the Btn --------------------------
    //Thi should take the banana out of the text input and put it in the basket on-click
    button.trigger('click');
    //So the text input should now be empty
    expect(wrapper.vm.fruit).toBe('');
    //The array for the basket should now contain banana
    expect(wrapper.vm.basket).toEqual(expect.arrayContaining(['banana']));
    //findAll() returns an array of components matching the CSS selector, but is deprecated; use findAllComponents().
    wrapper.vm.$nextTick(() => {
        expect(wrapper.findAll('li').length).toBe(1);
    });
});