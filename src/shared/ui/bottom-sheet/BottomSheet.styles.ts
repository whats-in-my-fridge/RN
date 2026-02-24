import { Dimensions, StyleSheet } from "react-native";

import { semanticColors, semanticRadius, semanticSpacing } from "@/shared/config/tokens";

export const bottomSheetStyles = StyleSheet.create({
  background: {
    backgroundColor: semanticColors["surface-card"],
    borderTopLeftRadius: semanticRadius["2xl"],
    borderTopRightRadius: semanticRadius["2xl"],
  },
  handleIndicator: {
    backgroundColor: semanticColors["stroke-default"],
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingBottom: semanticSpacing.lg,
  },
});

export const BOTTOM_SHEET_MAX_HEIGHT_RATIO = 0.9;

export const maxDynamicContentSize =
  Dimensions.get("window").height * BOTTOM_SHEET_MAX_HEIGHT_RATIO;
