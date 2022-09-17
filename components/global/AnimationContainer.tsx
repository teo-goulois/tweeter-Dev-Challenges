import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";
type Props = {};

const AnimationContainer = ({ children }: PropsWithChildren<Props>) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={false}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    exitBeforeEnter={true}
    onExitComplete={() => null}
  >
    {children}
  </AnimatePresence>
);

export default AnimationContainer;
