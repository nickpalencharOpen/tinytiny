# TinyTiny options

Extra options and configuration

### reserved.json
List of routes that cannot be used as names. BE CAREFUL ABOUT EDITING.
Removing `dashboard`, for example, will allow someone to make a redirect url with that route.
Breaking the file will cause the server to crash.

### errorCodes.json
List of error codes and the messages they should say. Can have a `header', `body`, and `image` (a link to an image
file).  This is used with the '/error?code=n' route, with `n` being the code.

# hardRoutes.json

hard JSON'd routes and the sites they redirect to. api/new-link will error if a custom link request matches this (no
need to add to reserved.json). By default, takes presidence over links in the database, that is, if a user created default link
`/example` to `google.com`, and `hardRoutes.json` was modified to add `/example` to `facebook.com`, users hitting `/example` will be
redirected to `facebook.com`, but db instance will remain. It is recommended these be set before users, and if modified,
a manual check to make sure the link is available should be done. **If a user has this link from db and it gets used in
this file, the user will not be notified that their link is inaccessable**

# dashboard.json

Options for the dashboard.

- `linkPerPage` - _number_ - Number of links to be displayed at a time.

# linkOptions.json

Options that define how tiny links should be specified.

- `defaultStartLength` - _number (required)_ - Length of the link code when a tiny link is automatically created. Does not include length of the URL, e.g. "tiny.com/Npq" is a length of 3, "tiny.com/hello" is a length of 5.
- `minLength` - _number (required)_ - Minimum length of the link code.
- `maxLegnth` - _number (required)_ - Maximum length of the link code.
- `validChars` - _string_ - list of characters to choose from when a link code is randomly generated. Make sure these are all URL-friendly.
- `customNameAllowed` - _boolean_ - if true, a field giving the user an option to define their link code will be visible and accessible via api. Custom links are still restricted by `minLength` and `maxLength`, but not by `validChars`.
