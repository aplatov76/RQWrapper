markdown
# RQ Wrapper

A React Query wrapper component for efficiently managing multiple queries and their loading states.

# Repository
https://github.com/aplatov76/RQWrapper

## Installation

```bash
yarn add @rndx/rq-wrapper

## Usage Example

jsx
import ReactQueryWrapper from '@rndx/rq-wrapper';

// In your component
<ReactQueryWrapper
  queries={{ map: mapQueryOptions }}
  loader={<CircleLoader />}
  error="Something went wrong"
  blockClassName={styles.rqwrapper}
>
  {(data) => {
    const dataMap = data.map;
    return (
      <MapContextProvider {...dataMap.map}>
        <Map data={dataMap} />
      </MapContextProvider>
    );
  }}
</ReactQueryWrapper>

## Props
queries (object): An object where keys are query names and values are React Query options objects

loader (ReactNode): Component to show while queries are loading

error (string | ReactNode): Error message or component to display when queries fail

blockClassName (string): CSS class name for the wrapper container

children (function): Render prop function that receives the query data