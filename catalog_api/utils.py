# catalop-api/utils.py

from flask import make_response, jsonify
from database_setup import User


class CustomValueError(ValueError):
    def __init__(self, status, message):
        self.status = status
        self.message = message


def get_userid_from_header(header):
    '''Validates if the given authorization header contains a valid
    user token. If so, decode the token returning the user_id. Otherwise,
    retrieves an error response message.
    '''
    if header:
        auth_token = header.split(' ')[0]
    else:
        auth_token = ''

    if auth_token:
        resp = User.decode_auth_token(auth_token)

        if isinstance(resp, str):
            raise CustomValueError('error', resp)

        return resp
    else:
        raise CustomValueError(
            'error', 'The auth token provided is not valid')
