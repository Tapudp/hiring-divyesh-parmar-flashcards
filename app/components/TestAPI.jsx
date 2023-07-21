"use client"
import React, {useEffect} from 'react';
import logger from '../helpers/logger';

export default function TestAPI () {
    useEffect(() => {
        const testApi = async () => {
          try {
            const response = await fetch('/api/', {
              method: 'GET',
            });
          } catch (error) {
            console.log('ERROR :: ', error);
          }
        };
        testApi();
      }, []);

    return <div> testing apis!!!</div>
}