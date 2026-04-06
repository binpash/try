/*!espree-section: super-function-call*/
function foo() {
    super();
}
/*!espree-section: super-property-call*/
function foo() {
    super.foo();
}
/*!espree-section: super-function-call-in-object-literal*/
var o = {

    foo: function() {
        super();
    }
};
/*!espree-section: super-property-call-in-object-literal*/
var o = {

    foo: function() {
        super.foo();
    }
};
/*!espree-section: invalid-super-global-call*/
super();
