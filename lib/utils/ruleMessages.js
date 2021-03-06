'use strict';

/**
 * Given an object of violation messages, return another
 * that provides the same messages postfixed with the rule
 * that has been violated.
 *
 * @param {string} ruleName
 * @param {{[k: string]: string|Function}} messages - Object whose keys are message identifiers
 *   and values are either message strings or functions that return message strings
 * @return {{[k: string]: string|Function}} New message object, whose messages will be marked with the rule name
 */
module.exports = function(ruleName, messages) {
	return Object.keys(messages).reduce(
		/**
		 * @param {{[k: string]: string|Function}} newMessages
		 * @param {string} messageId
		 * @return {{[k: string]: string|Function}}
		 */
		(newMessages, messageId) => {
            const messageText = messages[messageId];
            const id = `${ruleName}.${messageId}`;

			if (typeof messageText === 'string') {
				newMessages[messageId] = JSON.stringify({
                    id,
                    message: messageText.trim(),
                    values: {},
                });
			} else {
				newMessages[messageId] = (/** @type {any[]} */ ...args) => {
					return JSON.stringify({
                        id,
                        message: messageText(...args).trim(),
                        values: args.reduce((acc, curr, index) => {
							acc[`arg${index}`] = curr;

							return acc;
						}, {}),
                    });
				};
			}

			return newMessages;
		},
		{},
    );
};
