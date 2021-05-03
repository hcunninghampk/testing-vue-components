import GithubCard from '@/github-card'
import {mount} from '@vue/test-utils'

describe('Testing Vue instance methods with GitHub-Card template', () => {
    /*NOTES:
     Methods inside Vue are just plain fcns.  Means don't nec always hafta mount a comp to test fcnality. Often, simple
      methods, esp if working w/ Vuex, can be tested in isolation. */

    test('composeUrl() method', () => {
        //'pick' it off the comp 'as-is' w/ curly brackets
        const {composeUrl} = GithubCard.methods;
        expect(composeUrl(123)).toBe('https://api.github.com/users/123');
    });

    test('fetchData() method', async () => {
        //Mock async response.json() fcn w/ Jest and a Promise
        const jsonMock = jest.fn().mockResolvedValue('GITHUB DATA');

        //Mock the async fetch fcn w/ Jest and a Promise
        window.fetch = jest.fn().mockResolvedValue({
            //Jest method: mockResolvedValue() rtns a Promise whch resolves to what you set as the Val to rtn
            json: jsonMock
        });

        const wrapper = mount(GithubCard);
        wrapper.setData({ username: '123' });
        await wrapper.vm.fetchData();

        expect(window.fetch).toHaveBeenCalledWith('https://api.github.com/users/123');
        expect(jsonMock).toHaveBeenCalled();
        expect(wrapper.vm.data).toBe('GITHUB DATA');
    });

    //NONE OF THIS WORKS.  IT'S ALL DEPRECATED
    /*test('fetchData() method', async () => {
        //body of fetchData() method:  ** Is an async fcn
        /!*this.url = this.composeUrl(this.username) -- This fcn is tested above, so doesn't have to be tested here.
        const response = await fetch(this.url);
        this.data = await response.json();*!/

        //Mock async response.json() fcn w/ Jest and a Promise
        const jsonMock = jest.fn().mockResolvedValue('GITHUB DATA');

        //Mock the async fetch fcn w/ Jest and a Promise
        window.fetch = jest.fn().mockResolvedValue({
            //Jest method: mockResolvedValue() rtns a Promise whch resolves to what you set as the Val to rtn
            json: jsonMock
        });

        //since this method has refs to fcns and data, we need the wrapper
        //in options to mount, also can pass in meths as well as props
        // BUT! this passing in methods to options in mount is deprecated w/ 0 replacement.  Basically, should not be
        // doing this.  WTF???  Why is Vue teaching it this way then!!!!
        const wrapper = mount(GithubCard, {methods: {composeUrl: () => 'url'}});

        await wrapper.vm.fetchData();

        expect(window.fetch()).toHaveBeenCalledWith('url');
        expect(jsonMock).toHaveBeenCalled();
        expect(wrapper.vm.data).toBe('GITHUB DATA');
    });*/

});
