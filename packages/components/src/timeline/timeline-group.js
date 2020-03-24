/**
 * External dependencies
 */
import moment from 'moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import TimelineItem from './timeline-item';

const TimelineGroup = ( props ) => {
	const { items, groupKey, className } = props;
	const groupClassName = classnames(
		'woocommerce-timeline-group',
		className
	);

	const timelineItems = items.map( ( item, itemIndex ) => {
		const itemKey = groupKey + '-' + itemIndex;
		return (
			<TimelineItem key={ itemKey } item={ item } itemKey={ itemKey } />
		);
	} );
	const dayString = moment( groupKey ).format( 'MMMM D, YYYY' );

	return (
		<li className={ groupClassName }>
			<p className={ 'woocommerce-timeline-group__title' }>
				{ dayString }
			</p>
			<ul>{ timelineItems }</ul>
			<hr />
		</li>
	);
};

TimelineGroup.propTypes = {
	/**
	 * Additional CSS classes.
	 */
	className: PropTypes.string,
	/**
	 * An array of list items.
	 */
	items: PropTypes.arrayOf(
		PropTypes.shape( {
			/**
			 * Timestamp (in seconds) for the timeline item.
			 */
			datetime: PropTypes.number.isRequired,
			/**
			 * GridIcon for the Timeline item.
			 */
			gridicon: PropTypes.string.isRequired,
			/**
			 * Headline displayed for the list item.
			 */
			headline: PropTypes.string.isRequired,
			/**
			 * Body displayed for the list item.
			 */
			body: PropTypes.arrayOf( PropTypes.string ),
		} )
	).isRequired,
	groupKey: PropTypes.string.isRequired,
};

TimelineGroup.defaultProps = {
	className: '',
	items: [],
	groupKey: '00000000',
};

export default TimelineGroup;