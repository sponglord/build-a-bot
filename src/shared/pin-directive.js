export default {

    /**
     * A directive has a number of methods that act as hooks
     */

    /**
     * Re. 7_2 Creating a Custom Directive
     * Bind gets called as soon as the directive is bound to its parent component
     */
//    bind : (element) => {
//
//        // Do the styling that was previously done in the 'sale' class in PartSelector.vue
//        element.style.position = 'absolute';
//        element.style.right = '5px';
//        element.style.bottom = '5px';
//    }

    /**
     * Re. 7_3 Passing Data to a Directive
     *
     * The parameter 'binding' gives us access to any args or objects that are used to pass data to the directive
     */
    bind : (element, binding) => {

        /**
         * Re. 7_3-1 - passing data with arg
         */
//        if(window.console && window.console.log){
//            window.console.log('### pin-directive::bind:: arg=',binding.arg);
//            window.console.log('### pin-directive::bind:: modifiers=',binding.modifiers);
//        }

//        if(binding.arg !== 'position') return
//
//        // Loop over the modifiers and apply the style that pins the element to the corresponding position
//        Object.keys(binding.modifiers).forEach( (key) => {
//
//            element.style[key] = '5px';
//
//        });
//
//        element.style.position = 'absolute';

        /**
         * Re. 7_3-2 - passing data with an object
         */
//        if(window.console && window.console.log){
//            window.console.log('### pin-directive::bind:: value=',binding.value);
//        }
        // Loop over the passed object and apply the style that pins the element to the corresponding position
        Object.keys(binding.value).forEach( (position) => {

            element.style[position] = binding.value[position];

        });

        element.style.position = 'absolute';
    },


    /**
     * Re. 7_4 Using Directive Lifecycle Hooks
     *
     * Update is called whenever a parent component gets updated, which includes when the directive's bindings get updated
     * The directive will notice changes on the bindings of its parent element
     */
    update : (element, binding) => {

        // Do the same as the bind hook
        Object.keys(binding.value).forEach( (position) => {

            element.style[position] = binding.value[position];

        });

        element.style.position = 'absolute';
    },

    /**
     * Re. 7_4 Using Directive Lifecycle Hooks
     *
     * Inserted is called whenever the bound element is inserted into its parent node
     */
    inserted : () => {},

    /**
     * Re. 7_4 Using Directive Lifecycle Hooks
     *
     * componentUpdated is called whenever the containing component is updated - but only AFTER the containing components children are all updated
     * (the update hook might fire before the containing components children are all updated)
     */
    componentUpdated : () => {},

    /**
     * Re. 7_4 Using Directive Lifecycle Hooks
     *
     * unbind is called whenever the directive is unbound from its parent component
     */
    unbind : () => {},
}

/**
 * Re. 7_4 Using Directive Lifecycle Hooks
 *
 * bind and update are the most commonly used Directive Lifecycle Hooks and they are so often used together that there
 * is a shorthand for creating a directive that hooks into both the bind and update hooks
 */
//export default function (element, binding){
//
//    Object.keys(binding.value).forEach( (position) => {
//
//        element.style[position] = binding.value[position];
//
//    });
//
//    element.style.position = 'absolute';
//}