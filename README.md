Si[mple] Mod[el]
================

# Description

Simod is a really simple way to define models in ES6. It provides :

- attributes checking
- customizable (un)serializer for JSON
- immutable.js integration

It also contains a Collection class which defines some simple operations
on models.

# Usage

Your models should extend the Model class. When calling super, you should provide:

- attributes to set
- a property object which contains rules for attributes check

More documentation is coming soon, for now you can check given examples.

# Issues

While attributes are defined using an immutable map, nothing prevents you from 
overriding this property or adding an attribute to your class that is not immutable. 
If you want to keep the immutable behaviour, you should be careful when defining
properties on your models.