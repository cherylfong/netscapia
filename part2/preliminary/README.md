# Part 2 Notes

In addition to notes/comments found in this directory's [App.js](part2/preliminary/src/App.js).

1. If JavaScript code is generating HTML, then it must be wrapped in curl braces within a JSX template.

1. Each child in a list should have a unique "key" prop i.e. the elements generated by the map method, must each have a unique key value: an attribute called key.

1. React uses the key's attributes of objects in an array to determine how to update the view generated by a component when the component is re-rendered. [[ref](https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)]

1. `map` creates a new array. `notes.map((note, i) => ...)`, `note` is the `notes`' Object element and `i` becomes the index of these elements.

1. A whole React application can be written in a single file. Common practice is to declare each component in its own file as an ES6-module.

1. It is best practice for even smaller applications to have React components in a directory placed inside `/src` i.e. `/src/components` where the name of the component e.g. `Note` can be saved as `/src/components/Note.js`. Do not forget to include `export default Note` as the last line in the file. This exports the declared module as the variable `Note`. 

1. The `Note` module can be used in `App.js` by importing it as `import Note from './component/Note'`. The path is relative to the importing file e.g. relative to the location of `App.js`. `.` indicates current directory. The `.js` extension can be omitted.

1. When migrating project files do not include the `node_modules` directory, instead, reinstal the project by sing the `npm install` command before `npm start`.