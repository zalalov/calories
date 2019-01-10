exports.userExists = (joi) => {
    return {
        name: 'number',
        base: joi.number(),
        language: {
            datetime: 'must be a valid user_id.'
        },
        rules: [{
            name: 'userExists',
            params: {
                userExists: joi.func().ref().required()
            },
            validate(params, value, state, options) {
                console.log();

                // const prevName = params.greaterThan.root;
                // const prev = state.parent[prevName];
                // const current = value;
                //
                // if (current < prev) {
                //     return this.createError('string.greaterThan', { value, greaterThan: prevName }, state, options);
                // }
                return value
            }
        }]
    }
};
