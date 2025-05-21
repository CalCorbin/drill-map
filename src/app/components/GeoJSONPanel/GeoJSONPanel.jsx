import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './GeoJSONPanel.module.css';

export default function GeoJSONPanel({ geoData }) {
  const tableRef = useRef(null);

  useEffect(() => {
    if (!geoData || !geoData.features || geoData.features.length === 0) return;

    // Clear previous table
    d3.select(tableRef.current).selectAll('*').remove();

    // Extract depth data
    const tableData = geoData.features
      .filter((feature) => feature.properties['Total depth'])
      .map((feature) => ({
        hole_id: feature.properties.Hole_ID,
        depth: feature.properties['Total depth'],
        company: feature.properties.Company || 'Unknown',
      }))
      .sort((a, b) => d3.descending(a.depth, b.depth)); // Initial sort by depth descending

    // Color scale for companies
    const companies = [...new Set(tableData.map((d) => d.company))];
    const color = d3
      .scaleOrdinal()
      .domain(companies)
      .range(d3.schemeCategory10);

    // Create pagination controls and stats
    const controlPanel = d3
      .select(tableRef.current)
      .append('div')
      .attr('class', 'table-controls')
      .style('margin-bottom', '10px')
      .style('display', 'flex')
      .style('justify-content', 'space-between')
      .style('align-items', 'center');

    const statsInfo = controlPanel
      .append('div')
      .attr('class', 'table-stats')
      .style('font-size', '14px');

    statsInfo.text(`Total boreholes: ${tableData.length}`);

    // Set up the table container
    const table = d3
      .select(tableRef.current)
      .append('div')
      .attr('class', 'excel-table-container')
      .style('width', '100%')
      .style('max-height', '600px')
      .style('overflow', 'auto')
      .style('font-family', 'Arial, sans-serif')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px');

    // Create the table header
    const header = table
      .append('div')
      .attr('class', 'table-header')
      .style('display', 'grid')
      .style(
        'grid-template-columns',
        'minmax(100px, 1fr) minmax(100px, 1fr) minmax(150px, 1fr)'
      )
      .style('background-color', '#f7f7f7')
      .style('font-weight', 'bold')
      .style('border-bottom', '2px solid #ddd')
      .style('position', 'sticky')
      .style('top', '0')
      .style('z-index', '1');

    // Add header cells
    const columns = ['Hole ID', 'Total Depth (m)', 'Company'];
    columns.forEach((col) => {
      header
        .append('div')
        .attr('class', 'header-cell')
        .style('padding', '10px')
        .style('border-right', '1px solid #ddd')
        .style('cursor', 'pointer')
        .style('user-select', 'none')
        .text(col)
        .on('click', function () {
          // Add sorting functionality
          const isAscending = this.getAttribute('data-order') !== 'asc';
          this.setAttribute('data-order', isAscending ? 'asc' : 'desc');

          // Clear all sorting indicators
          header.selectAll('.header-cell').text(function () {
            return this.textContent.replace(' ▲', '').replace(' ▼', '');
          });

          // Add sorting indicator
          this.textContent += isAscending ? ' ▲' : ' ▼';

          // Determine which column to sort by
          const columnIndex = columns.indexOf(
            this.textContent.replace(' ▲', '').replace(' ▼', '')
          );
          const columnKey = ['hole_id', 'depth', 'company'][columnIndex];

          // Sort the data
          tableData.sort((a, b) => {
            if (columnKey === 'depth') {
              return isAscending
                ? d3.ascending(+a[columnKey], +b[columnKey])
                : d3.descending(+a[columnKey], +b[columnKey]);
            } else {
              return isAscending
                ? d3.ascending(a[columnKey], b[columnKey])
                : d3.descending(a[columnKey], b[columnKey]);
            }
          });

          // Redraw rows
          renderRows();
        });
    });

    // Create the table body
    const tableBody = table.append('div').attr('class', 'table-body');

    // Add search functionality
    const searchContainer = d3
      .select(tableRef.current)
      .insert('div', ':first-child')
      .attr('class', 'search-container')
      .style('margin-bottom', '15px')
      .style('display', 'flex')
      .style('align-items', 'center');

    searchContainer
      .append('label')
      .attr('for', 'table-search')
      .style('margin-right', '10px')
      .style('font-weight', 'bold')
      .text('Search:');

    const searchInput = searchContainer
      .append('input')
      .attr('id', 'table-search')
      .attr('type', 'text')
      .attr('placeholder', 'Filter by any column...')
      .style('padding', '8px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '4px')
      .style('width', '250px');

    searchInput.on('input', function () {
      const searchTerm = this.value.toLowerCase();
      const filteredData =
        searchTerm === ''
          ? tableData
          : tableData.filter(
              (d) =>
                d.hole_id.toString().toLowerCase().includes(searchTerm) ||
                d.depth.toString().toLowerCase().includes(searchTerm) ||
                d.company.toLowerCase().includes(searchTerm)
            );

      // Update table stats with filtered count
      statsInfo.text(
        `Showing ${filteredData.length} of ${tableData.length} boreholes`
      );

      // Render filtered rows
      renderRows(filteredData);
    });

    function renderRows(data = tableData) {
      // Clear existing rows
      tableBody.selectAll('.table-row').remove();

      // Add table rows
      data.forEach((d, i) => {
        const row = tableBody
          .append('div')
          .attr('class', 'table-row')
          .style('display', 'grid')
          .style(
            'grid-template-columns',
            'minmax(100px, 1fr) minmax(100px, 1fr) minmax(150px, 1fr)'
          )
          .style('border-bottom', '1px solid #ddd')
          .style('background-color', i % 2 === 0 ? '#fff' : '#f9f9f9')
          .style('transition', 'background-color 0.2s')
          .on('mouseover', function () {
            d3.select(this).style('background-color', '#eef7ff');
          })
          .on('mouseout', function () {
            d3.select(this).style(
              'background-color',
              i % 2 === 0 ? '#fff' : '#f9f9f9'
            );
          });

        // Borehole ID cell
        row
          .append('div')
          .style('padding', '8px 10px')
          .style('border-right', '1px solid #ddd')
          .text(d.hole_id);

        // Depth cell
        row
          .append('div')
          .style('padding', '8px 10px')
          .style('border-right', '1px solid #ddd')
          .style('text-align', 'right')
          .text(d.depth);

        // Company cell with color indicator
        const companyCell = row
          .append('div')
          .style('padding', '8px 10px')
          .style('display', 'flex')
          .style('align-items', 'center');

        companyCell
          .append('div')
          .style('width', '10px')
          .style('height', '10px')
          .style('background-color', color(d.company))
          .style('margin-right', '8px')
          .style('border-radius', '2px');

        companyCell.append('span').text(d.company);
      });
    }

    renderRows();

    const legendContainer = d3
      .select(tableRef.current)
      .append('div')
      .attr('class', 'legend-container')
      .style('margin-top', '20px')
      .style('padding-top', '15px')
      .style('border-top', '1px solid #ddd')
      .style('display', 'flex')
      .style('flex-wrap', 'wrap')
      .style('gap', '15px');

    legendContainer
      .append('div')
      .style('width', '100%')
      .style('font-weight', 'bold')
      .style('margin-bottom', '8px')
      .text('Company Legend:');

    companies.forEach((company) => {
      const legendItem = legendContainer
        .append('div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-right', '15px')
        .style('margin-bottom', '8px');

      legendItem
        .append('div')
        .style('width', '12px')
        .style('height', '12px')
        .style('background-color', color(company))
        .style('margin-right', '6px')
        .style('border-radius', '2px');

      legendItem.append('span').style('font-size', '12px').text(company);
    });
  }, [geoData]);

  return (
    <div className={styles.container}>
      <h2>Borehole Depth Data</h2>
      <div ref={tableRef} />
    </div>
  );
}
