import React, { useState } from 'react';
import SetupLayout from '~/src/layouts/Setup';
import { post } from '../../helpers/api';
import Router from 'next/router';
import Toast from '../../components/Toast';

function Setup() {
  return (
    <SetupLayout>
      <h1 className="text-xl font-semibold">Setup Assistant Relay</h1>
      <div className="mt-6  border-t border-gray-200 pt-5">
        <SetupTutorial />
      </div>
    </SetupLayout>
  );
}

export default Setup;

const url =
  'https://greghesp.github.io/assistant-relay/docs/getting-started/configuration#configuring-credentials';

function SetupTutorial() {
  const [track, setTrack] = useState(true);
  const [toastData, setToastData] = useState({ show: false });

  async function next(e) {
    try {
      await post('/api/server/setTracking', {
        track: track,
      });

      Router.push({
        pathname: '/setup/credentials',
      });
    } catch (e) {
      setToastData({
        show: true,
        content: e.message,
        success: false,
      });
      await post('/api/server/writeLogs', {
        level: 'error',
        message: e.message,
        service: 'web',
        func: 'SetupTutorial - next',
      });
    }
  }

  return (
    <div>
      <Toast show={toastData.show} content={toastData.content} success={toastData.success} />
      <p className="text-center text-sm">
        To continue your setup, and get your credentials. <a href={url}>Follow the setup guide</a>{' '}
        in the documentation{' '}
      </p>

      <div className="flex mt-6">
        <div className="mx-auto">
          <a
            href={url}
            target="_blank"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md  transition duration-150 ease-in-out"
          >
            Setup Guide
          </a>
          <button
            onClick={e => next(e)}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium
            rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700
            focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ml-5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
