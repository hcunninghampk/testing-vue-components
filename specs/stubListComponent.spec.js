import {shallowMount} from "@vue/test-utils";
import ListComponent from '@/list.vue'
import ListItem from '@/components/list-item.vue'

/* Stubbing Child Components:
Stubbing -- replacing implementation of something existent with an implementation fitting the needs of the test. Similar
to mocking, but more complex in implementation.  A piece of code standing in for another.

Easiest way to stub w/ Vue Test Utils is to use shallowMount().
*/

const ListItemStub = {
    template: "<li>{{ movie }}</li>",
    props: ["movie"]
};

//What is the point of this entire test and lesson?  It does nothing new from the very first lesson and is so void of
// detail and current fcnlty as to be a total waste of time.
test("shallowMount of List Component", () => {
    /* shallowMount() can take a 2nd param of an obj lit w/ property 'stubs' where you can stub out individ comps, like
    list items.  Allows you access to/change the individ comps.  And all of this is deprecated, lke everything in this
    class, wtf...  Passing a string to stubs is no longer supported at all, the name of the stubbed component is now
     a string, and you pass it an obj that is { Component || string || boolean } || Array<string> .  */
    //const wrapper = shallowMount(ListComponent/*, {stubs: {ListItem: '<div class="list-item" />'}}*/);
    const wrapper = shallowMount(ListComponent, {stubs: {'list-item': ListItemStub}});
    //The above does the exact same behavior as if I had only shallowMounted the ListComp alone w/o stubs.  This lesson makes 0 sense.

    expect(wrapper).toMatchSnapshot();

    console.log("Log of shallowMount(ListComponent): " + wrapper.html());

    //shallowMount() should stub out the list items in the list and add the word 'stub' to the list item HTML tags
    //This HTML can be seen in the gen'd snapshot file also.
    expect(wrapper.html()).toContain('<listitem-stub movie="Iron Man"></listitem-stub>');
});