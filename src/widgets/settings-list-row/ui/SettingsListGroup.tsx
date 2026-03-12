import { Children, cloneElement, Fragment, isValidElement } from "react";
import { View } from "react-native";

import { tokens } from "@/shared/config/tokens";

interface SettingsListGroupProps {
  children: React.ReactNode;
}

/** 같은 그룹의 설정 행들을 하나의 카드로 묶고, 행 사이에 구분선을 넣습니다. */
export function SettingsListGroup({ children }: SettingsListGroupProps) {
  const childArray = Children.toArray(children);

  return (
    <View className="overflow-hidden rounded-list border border-stroke-default bg-surface-card">
      {childArray.map((child, index) => (
        <Fragment key={index}>
          {isValidElement(child) && child.type
            ? cloneElement(child as React.ReactElement<{ grouped?: boolean }>, {
                grouped: true,
              })
            : child}
          {index < childArray.length - 1 && (
            <View
              className="mx-card h-px"
              style={{ backgroundColor: tokens.color["stroke-default"] }}
            />
          )}
        </Fragment>
      ))}
    </View>
  );
}
