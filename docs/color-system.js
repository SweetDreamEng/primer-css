import React from 'react'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import colors from 'primer-colors'
import titleCase from 'title-case'
import {BorderBox, Box, Flex, Heading, Text} from '@primer/components'

const {black, white} = colors

export const gradientHues = ['gray', 'blue', 'green', 'purple', 'yellow', 'orange', 'red']

export function ColorPalette(props) {
  return (
    <Flex mb={6} className="markdown-no-margin" {...props}>
      {gradientHues.map(hue => {
        const color = colors[hue][5]
        return (
          <Box bg={color} p={3} width={200} mr={2} mb={2} key={hue}>
            <Text fontWeight="bold" color={overlayColor(color)}>
              {titleCase(hue)}
            </Text>
          </Box>
        )
      })}
      <BorderBox bg="white" p={3} width={200} mb={2} borderRadius={0}>
        <Text fontWeight="bold" color="black">
          White
        </Text>
      </BorderBox>
    </Flex>
  )
}

export function ColorVariables(props) {
  return (
    <>
      <Flex flexWrap="wrap" className="gutter" {...props}>
        {gradientHues.map(hue => (
          <ColorVariable id={hue} hue={hue} key={hue} />
        ))}
      </Flex>
      <Flex flexWrap="wrap" {...props}>
        <FadeVariables id="black" hue="black" bg="black" color="white">
          <BorderBox border={0} borderRadius={0} borderTop={1} borderColor="gray.5" mt={1}>
            <Text as="div" fontSize={2} pt={3} mb={0}>
              Black fades apply alpha transparency to the <Var>$black</Var> variable. The black color value has a slight
              blue hue to match our grays.
            </Text>
          </BorderBox>
        </FadeVariables>
        <FadeVariables id="white" hue="white" over={black}>
          <BorderBox border={0} borderRadius={0} borderTop={1} mt={1}>
            <Text as="div" fontSize={2} pt={3} mb={0}>
              White fades apply alpha transparency to the <Var>$white</Var> variable, below these are shown overlaid on
              a dark gray background.
            </Text>
          </BorderBox>
        </FadeVariables>
      </Flex>
    </>
  )
}

export function ColorVariable({hue, ...rest}) {
  const values = colors[hue]
  return (
    <Flex.Item as={Box} minWidth={240} pr={4} mb={6} className="col-12 col-md-6 markdown-no-margin" {...rest}>
      {/* <Heading as="div">{titleCase(hue)}</Heading> */}
      <Box bg={`${hue}.5`} my={2} p={3} color="white">
        <Heading as="div" pb={3} fontSize={56} fontWeight="light">
          {titleCase(hue)}
        </Heading>
        <Flex justifyContent="space-between">
          <Flex.Item as={Var}>${hue}-500</Flex.Item>
          <Flex.Item flex="1 1 auto" ml={3} as={Var}>
            .bg-{hue}-5
          </Flex.Item>
          <Text justifySelf="end" fontFamily="mono">
            {values[5]}
          </Text>
        </Flex>
      </Box>
      {values.map((value, index) => (
        <Swatch name={`${hue}-${index}00`} value={value} key={value} />
      ))}
    </Flex.Item>
  )
}

ColorVariable.propTypes = {
  hue: PropTypes.oneOf(Object.keys(colors)).isRequired
}

export function FadeVariables({hue, color, bg, over, children, ...rest}) {
  const colorValue = colors[hue]
  const alphas = [15, 30, 50, 70, 85]
  const values = alphas.map(alpha => {
    const value = chroma(colorValue)
      .alpha(alpha / 100)
      .css()
    return {
      name: `${hue}-fade-${alpha}`,
      textColor: fadeTextColor(value, over),
      value
    }
  })
  const boxProps = {color, bg}
  return (
    <Flex.Item as={Box} pr={4} mb={6} width={1 / 2} className="markdown-no-margin" {...rest}>
      {/* <Heading as="div">{titleCase(hue)}</Heading> */}
      <Box my={2} p={3} {...boxProps}>
        <Heading as="div" pb={3} fontSize={56} fontWeight="light">
          {titleCase(hue)}
        </Heading>
        <Flex justifyContent="space-between">
          <Flex.Item flex="1 1 auto" as={Var}>
            ${hue}
          </Flex.Item>
          <Text fontFamily="mono">
            {chroma(colorValue).css()}
            {' / '}
            {colorValue}
          </Text>
        </Flex>
        {children}
      </Box>
      <Box bg={over}>
        {values.map(swatchProps => (
          <Swatch {...swatchProps} key={swatchProps.name} />
        ))}
      </Box>
    </Flex.Item>
  )
}

FadeVariables.propTypes = {
  bg: Box.propTypes.color,
  color: Box.propTypes.color,
  hue: PropTypes.oneOf(['black', 'white']),
  over: PropTypes.string
}

function Swatch(props) {
  const {name, index, value, textColor = overlayColor(value), ...rest} = props
  return (
    <Box bg={value} color={textColor} {...rest}>
      <Text as={Flex} fontSize={1} justifyContent="space-between">
        <Box as={Var} p={3}>
          ${name}
        </Box>
        <Box as={Text} fontFamily="mono" p={3}>
          .bg-{name}-{index}
        </Box>
        <Box as={Text} fontFamily="mono" p={3}>
          {value}
        </Box>
      </Text>
    </Box>
  )
}

Swatch.propTypes = {
  name: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  value: PropTypes.string.isRequired
}

function Var(props) {
  // FIXME: fontStyle should be a prop, right?
  return <Text as="var" fontWeight="bold" fontFamily="mono" style={{fontStyle: 'normal'}} {...props} />
}

export function overlayColor(bg) {
  return chroma(bg).luminance() > 0.5 ? black : white
}

function fadeTextColor(fg, bg = white) {
  const rgb = compositeRGB(fg, bg)
  return overlayColor(rgb)
}

/**
 * Composite ("flatten") a foreground RGBA value with an RGB background into an
 * RGB color for the purposes of measuring contrast or luminance.
 */
function compositeRGB(foreground, background) {
  const [fr, fg, fb, fa] = chroma(foreground).rgba()
  const [br, bg, bb] = chroma(background).rgb()
  return chroma([(1 - fa) * br + fa * fr, (1 - fa) * bg + fa * fg, (1 - fa) * bb + fa * fb]).css()
}
