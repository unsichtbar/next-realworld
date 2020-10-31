import React from "react";

const UncontrolledTabs: React.FC<any> = props => {
  console.log('uncontrolled', props)
  let children: React.ReactElement<TabProps>[] = React.Children.toArray(
    props.children
  ) as any;
  const [selectedTab, setSelectedTab] = React.useState(
    children.map((child) => child.props.title).indexOf(props.initialTab || "")
  );

  return (
    <>
      <section>
        {children.map((tab, idx) => (
          <button
            type="button"
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(idx);
            }}
          >
            {tab.props.title}
          </button>
        ))}
      </section>
      <section>{children[selectedTab]}</section>
    </>
  );
}


export const Tabs: React.FC<{ selectedTab?: string, onChange?: (tab: string) => unknown }> = (props) => {
  console.log('selected tab is', props.selectedTab)
  const children: React.ReactElement<TabProps>[] = React.Children.toArray(props.children) as any;
  const defaultTab = children[0].props.title;
  if(!props.selectedTab) {
    return <UncontrolledTabs initialTab={defaultTab}>{props.children}</UncontrolledTabs>;
  }

  return <TabsControlled onChange={props.onChange}  selectedTab={props.selectedTab || defaultTab} >{props.children}</TabsControlled>

};

interface TabProps {
  title: string;
}
export const Tab: React.FC<TabProps> = (props) => {
  return <>{props.children}</>;
};

const TabsControlled: React.FC<{selectedTab: string, onChange?: (tab: string) => unknown}> = props => {
  console.log('controlled', props)
  let children: React.ReactElement<TabProps>[] = React.Children.toArray(
    props.children
  ) as any;
  const index =  
    children.map((child) => child.props.title).indexOf(props.selectedTab || "")
  return (
    <>
      <section>
        {children.map((tab, idx) => (
          <button
            type="button"
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              props.onChange && props.onChange(tab.props.title)
            }}
          >
            {tab.props.title}
          </button>
        ))}
      </section>
      <section>{children[index]}</section>
    </>
  );

}