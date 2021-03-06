/* jshint expr:true */
import { it } from 'ember-mocha';
import { describe, beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import OAuth2BearerAuthorizer from 'ember-simple-auth/authorizers/oauth2-bearer';

describe('OAuth2BearerAuthorizer', () => {
  let authorizer;
  let data;
  let block;

  beforeEach(() => {
    authorizer = OAuth2BearerAuthorizer.create();
    block = sinon.spy();
  });

  describe('#authorize', () => {
    function itDoesNotAuthorizeTheRequest() {
      it('does not call the block', () => {
        authorizer.authorize(data, block);

        expect(block).to.not.have.been.called;
      });
    }

    describe('when the session data contains a non empty access_token', () => {
      beforeEach(() => {
        data  = {
          'access_token': 'secret token!'
        };
      });

      it('calls the block with a Bearer token header', () => {
        authorizer.authorize(data, block);

        expect(block).to.have.been.calledWith('Authorization', 'Bearer secret token!');
      });
    });

    describe('when the session does not contain an access_token', () => {
      beforeEach(() => {
        data = {};
      });

      itDoesNotAuthorizeTheRequest();
    });
  });
});
