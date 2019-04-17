<?php
/**
 * WooCommerce Analytics.
 * NOTE: DO NOT edit this file in WooCommerce core, this is generated from woocommerce-admin.
 *
 * @package Woocommerce Admin
 */

/**
 * Contains backend logic for the Analytics feature.
 */
class WC_Admin_Analytics {
	/**
	 * Class instance.
	 *
	 * @var WC_Admin_Analytics instance
	 */
	protected static $instance = null;

	/**
	 * Get class instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Hook into WooCommerce.
	 */
	public function __construct() {
		add_filter( 'woocommerce_component_settings_preload_endpoints', array( $this, 'add_preload_endpoints' ) );
		add_filter( 'wc_admin_get_user_data_fields', array( $this, 'add_user_data_fields' ) );
		add_action( 'admin_menu', array( $this, 'register_pages' ) );
	}

	/**
	 * Preload data from the countries endpoint.
	 *
	 * @param array $endpoints Array of preloaded endpoints.
	 * @return array
	 */
	public function add_preload_endpoints( $endpoints ) {
		$endpoints['countries'] = '/wc/v4/data/countries';
		return $endpoints;
	}

	/**
	 * Adds fields so that we can store user preferences for the columns to display on a report.
	 *
	 * @param array $user_data_fields User data fields.
	 * @return array
	 */
	public function add_user_data_fields( $user_data_fields ) {
		return array_merge(
			$user_data_fields,
			array(
				'categories_report_columns',
				'coupons_report_columns',
				'customers_report_columns',
				'orders_report_columns',
				'products_report_columns',
				'revenue_report_columns',
				'taxes_report_columns',
				'variations_report_columns',
			)
		);
	}

	/**
	 * Registers report pages.
	 */
	public function register_pages() {
		add_menu_page(
			__( 'WooCommerce Analytics', 'woocommerce-admin' ),
			__( 'Analytics', 'woocommerce-admin' ),
			'manage_options',
			'wc-admin#/analytics/revenue',
			array( 'WC_Admin_Loader', 'page_wrapper' ),
			'dashicons-chart-bar',
			56 // After WooCommerce & Product menu items.
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Revenue', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/revenue',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Orders', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/orders',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Products', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/products',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Categories', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/categories',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Coupons', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/coupons',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Taxes', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/taxes',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Downloads', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/downloads',
			)
		);

		if ( 'yes' === get_option( 'woocommerce_manage_stock' ) ) {
			wc_admin_register_page(
				array(
					'title'  => __( 'Stock', 'woocommerce-admin' ),
					'parent' => '/analytics/revenue',
					'path'   => '/analytics/stock',
				)
			);
		}

		wc_admin_register_page(
			array(
				'title'  => __( 'Customers', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/customers',
			)
		);

		wc_admin_register_page(
			array(
				'title'  => __( 'Settings', 'woocommerce-admin' ),
				'parent' => '/analytics/revenue',
				'path'   => '/analytics/settings',
			)
		);
	}
}

new WC_Admin_Analytics();