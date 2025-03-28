import test from 'ava'
import React from 'react'
import {Box, Text} from 'ink'
import {render} from 'ink-testing-library'
import PropTypes from 'prop-types'

import Table, {Header, Skeleton, Cell} from '.'

// Helpers -------------------------------------------------------------------

const skeleton = v => <Skeleton>{v}</Skeleton>
const header = v => <Header>{v}</Header>
const cell = v => <Cell>{v}</Cell>

const Custom = ({children}) => <Text italic color="red">{children}</Text>
Custom.propTypes = {
  children: PropTypes.any.isRequired
}

const custom = v => <Custom>{v}</Custom>

// Tests ---------------------------------------------------------------------

test('Renders table.', t => {
  const data = [{name: 'Foo'}]
  const {lastFrame: actual} = render(<Table data={data}/>)
  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header(' name ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Foo  ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with numbers.', t => {
  const data = [{name: 'Foo', age: 12}]
  const {lastFrame: actual} = render(<Table data={data}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┬')}{skeleton('─────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header(' name ')}{skeleton('│')}{header(' age ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Foo  ')}{skeleton('│')}{cell(' 12  ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┴')}{skeleton('─────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with multiple rows.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 0}]
  const {lastFrame: actual} = render(<Table data={data}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┬')}{skeleton('─────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header(' name ')}{skeleton('│')}{header(' age ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Foo  ')}{skeleton('│')}{cell(' 12  ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Bar  ')}{skeleton('│')}{cell(' 0   ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┴')}{skeleton('─────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with undefined value.', t => {
  const data = [{name: 'Foo'}, {name: 'Bar', age: 15}]
  const {lastFrame: actual} = render(<Table data={data}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┬')}{skeleton('─────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header(' name ')}{skeleton('│')}{header(' age ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Foo  ')}{skeleton('│')}{cell('     ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Bar  ')}{skeleton('│')}{cell(' 15  ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┴')}{skeleton('─────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with custom padding.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const {lastFrame: actual} = render(<Table data={data} padding={3}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────────')}{skeleton('┬')}{skeleton('─────────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header('   name   ')}{skeleton('│')}{header('   age   ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────────')}{skeleton('┼')}{skeleton('─────────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell('   Foo    ')}{skeleton('│')}{cell('   12    ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────────')}{skeleton('┼')}{skeleton('─────────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell('   Bar    ')}{skeleton('│')}{cell('   15    ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────────')}{skeleton('┴')}{skeleton('─────────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with custom header.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const {lastFrame: actual} = render(<Table data={data} header={Custom}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┬')}{skeleton('─────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{custom(' name ')}{skeleton('│')}{custom(' age ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Foo  ')}{skeleton('│')}{cell(' 12  ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{cell(' Bar  ')}{skeleton('│')}{cell(' 15  ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┴')}{skeleton('─────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with custom cell.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const {lastFrame: actual} = render(<Table data={data} cell={Custom}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{skeleton('┌')}{skeleton('──────')}{skeleton('┬')}{skeleton('─────')}{skeleton('┐')}</Box>
      <Box>{skeleton('│')}{header(' name ')}{skeleton('│')}{header(' age ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{custom(' Foo  ')}{skeleton('│')}{custom(' 12  ')}{skeleton('│')}</Box>
      <Box>{skeleton('├')}{skeleton('──────')}{skeleton('┼')}{skeleton('─────')}{skeleton('┤')}</Box>
      <Box>{skeleton('│')}{custom(' Bar  ')}{skeleton('│')}{custom(' 15  ')}{skeleton('│')}</Box>
      <Box>{skeleton('└')}{skeleton('──────')}{skeleton('┴')}{skeleton('─────')}{skeleton('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

test('Renders table with custom skeleton.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const {lastFrame: actual} = render(<Table data={data} skeleton={Custom}/>)

  const {lastFrame: expected} = render(
    <>
      <Box>{custom('┌')}{custom('──────')}{custom('┬')}{custom('─────')}{custom('┐')}</Box>
      <Box>{custom('│')}{header(' name ')}{custom('│')}{header(' age ')}{custom('│')}</Box>
      <Box>{custom('├')}{custom('──────')}{custom('┼')}{custom('─────')}{custom('┤')}</Box>
      <Box>{custom('│')}{cell(' Foo  ')}{custom('│')}{cell(' 12  ')}{custom('│')}</Box>
      <Box>{custom('├')}{custom('──────')}{custom('┼')}{custom('─────')}{custom('┤')}</Box>
      <Box>{custom('│')}{cell(' Bar  ')}{custom('│')}{cell(' 15  ')}{custom('│')}</Box>
      <Box>{custom('└')}{custom('──────')}{custom('┴')}{custom('─────')}{custom('┘')}</Box>
    </>
  )

  t.is(actual(), expected())
})

// ---------------------------------------------------------------------------
