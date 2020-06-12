/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */

import { Plugins } from '../index.js';

// This function will cause Jest to wait until all Promises have completed
// See: https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that
function tick() {
	return new Promise( ( resolve ) => {
		setTimeout( resolve, 0 );
	} );
}

describe( 'Rendering', () => {
	it( 'should render nothing when autoInstalling', async () => {
		const installPlugins = jest.fn().mockResolvedValue( { success: true } );
		const activatePlugins = jest.fn().mockResolvedValue( {
			success: true,
			data: {
				activated: [ 'jetpack' ],
			},
		} );
		const createNotice = jest.fn();
		const onComplete = jest.fn();

		const pluginsWrapper = shallow(
			<Plugins
				autoInstall
				pluginSlugs={ [ 'jetpack' ] }
				onComplete={ onComplete }
				installPlugins={ installPlugins }
				activatePlugins={ activatePlugins }
				createNotice={ createNotice }
			/>
		);

		await tick();

		const buttons = pluginsWrapper.find( Button );
		expect( buttons.length ).toBe( 0 );
	} );

	it( 'should render a continue button when no pluginSlugs are given', async () => {
		const pluginsWrapper = shallow(
			<Plugins pluginSlugs={ [] } onComplete={ () => {} } />
		);

		await tick();

		const continueButton = pluginsWrapper.find( Button );
		expect( continueButton.length ).toBe( 1 );
		expect( continueButton.text() ).toBe( 'Continue' );
	} );

	it( 'should render install and no thanks buttons', async () => {
		const pluginsWrapper = shallow(
			<Plugins pluginSlugs={ [ 'jetpack' ] } onComplete={ () => {} } />
		);

		await tick();

		const buttons = pluginsWrapper.find( Button );
		expect( buttons.length ).toBe( 2 );
		expect( buttons.at( 0 ).text() ).toBe( 'Install & enable' );
		expect( buttons.at( 1 ).text() ).toBe( 'No thanks' );
	} );
} );

describe( 'Installing and activating', () => {
	let pluginsWrapper;
	const installPlugins = jest.fn().mockResolvedValue( { success: true } );
	const activatePlugins = jest.fn().mockResolvedValue( {
		success: true,
		data: {
			activated: [ 'jetpack' ],
		},
	} );
	const createNotice = jest.fn();
	const onComplete = jest.fn();

	beforeEach( () => {
		installPlugins.mockClear();
		activatePlugins.mockClear();

		pluginsWrapper = shallow(
			<Plugins
				pluginSlugs={ [ 'jetpack' ] }
				onComplete={ onComplete }
				installPlugins={ installPlugins }
				activatePlugins={ activatePlugins }
				createNotice={ createNotice }
			/>
		);
	} );

	it( 'should call installPlugins', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( installPlugins ).toHaveBeenCalledWith( [ 'jetpack' ] );
	} );

	it( 'should call activatePlugin', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( activatePlugins ).toHaveBeenCalledWith( [ 'jetpack' ] );
	} );
	it( 'should create a success notice', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( createNotice ).toHaveBeenCalledWith(
			'success',
			'Plugins were successfully installed and activated.'
		);
	} );
	it( 'should call the onComplete callback', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( onComplete ).toHaveBeenCalledWith( [ 'jetpack' ] );
	} );
} );

describe( 'Installing and activating errors', () => {
	let pluginsWrapper;
	const errors = {
		errors: {
			'failed-plugin': [ 'error message' ],
		},
	};
	const installPlugins = jest.fn().mockResolvedValue( {
		errors,
	} );
	const activatePlugins = jest.fn().mockResolvedValue( {
		success: false,
	} );
	const createNotice = jest.fn();
	const onError = jest.fn();

	beforeEach( () => {
		installPlugins.mockClear();
		activatePlugins.mockClear();

		pluginsWrapper = shallow(
			<Plugins
				pluginSlugs={ [ 'jetpack' ] }
				onComplete={ () => {} }
				installPlugins={ installPlugins }
				activatePlugins={ activatePlugins }
				createNotice={ createNotice }
				onError={ onError }
			/>
		);
	} );

	it( 'should not call activatePlugin on install error', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( activatePlugins ).not.toHaveBeenCalled();
	} );

	it( 'should create an error notice', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( createNotice ).toHaveBeenCalledWith(
			'error',
			errors.errors[ 'failed-plugin' ][ 0 ]
		);
	} );

	it( 'should call the onError callback', async () => {
		const installButton = pluginsWrapper.find( Button ).at( 0 );
		installButton.simulate( 'click' );

		await tick();

		expect( onError ).toHaveBeenCalledWith( errors );
	} );
} );
