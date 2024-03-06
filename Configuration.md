Here are my comments regarding how the project is configured.

## `package.json` file

- There are many packages in the project's `package.json` file that are below their latest minor version. Those should be bumped to the latest minor version (not major versions as major versions may contain breaking changes. Furthermore, every package has documentation on the breaking changes, and sometimes even guide to migrate).
- Especially, the version of `react-bootstrap` is `2.0.0-beta.2`, which is a beta version and might have major bugs. It should be updated to the latest stable version (at least `2.0.0`).

## `eslint` and `prettier`

- The project doesn't use `eslint` and `prettier` at the moment.
- `eslint` is almost a must as it helps to enforce a consistent code style across the project and prevents potential errors.
- `prettier` is a good idea to use as well, as it helps to format the code automatically. It's a good idea to use them together, as `eslint` can be configured to use `prettier` to format the code.
