import Vuex from 'vuex'
import Vue from 'vue'
//import * as vue from '@vue/test-utils' // to import all from @vue/test-utils, then have to call meths with vue dot
import {mount, createLocalVue} from '@vue/test-utils'
import SaladBowlComponent from '@/salad-bowl.vue'
import saladStore from '@/store/salad-store.js'

//Vuex is the state management companion to Vue.js
//Tests for Salad-Bowl components ability to read and write to the Vuex Store: Salad-Store

//NOTE: The data store is not imported directly in the Salad-Bowl component

//Vue.use(Vuex);
// but this pollutes the Vue instance

//It's better to use the localVueInstance and meth createLocalVue().
/*createLocalVue() -- Creates a local copy of Vue to use when mounting the component(s). Installing plugins on this copy
of Vue prevents polluting the original Vue copy.*/
const localVueWithVuex = createLocalVue();
localVueWithVuex.use(Vuex);

describe('Vuex Data Store Tests', () => {
//test the store is loaded properly
    test("Salad data store is loaded properly", () => {
        const store = new Vuex.Store(saladStore);
        //Mount the comp and pass a store to the mount options
        const wrapper = mount(SaladBowlComponent,
            {
                localVue: localVueWithVuex,
                store
            });
        //Try to push a value directly to the store
        store.state.salad.push('cucumber');

        //Now ensure cucumber is listed in the data store's arr
        console.log("Salad contains: " + wrapper.vm.salad);
        expect(wrapper.vm.salad).toEqual(['cucumber']);
    });

    test("Salad data store can add an ingredient to the salad", () => {
        const store = new Vuex.Store(saladStore);
        const wrapper = mount(SaladBowlComponent,
            {
                localVue: localVueWithVuex,
                store
            });

        //These 2 lines should fail.  BUUUT, it passes, of course, because everything in this course has been wrong so far.
        // So, why wouldn't this 'failure' be wrong, too?
        wrapper.vm.addIngredient('tomato');

        console.log("Salad contains: " + wrapper.vm.salad);
        expect(wrapper.vm.salad).toEqual(['tomato']);
    });
});