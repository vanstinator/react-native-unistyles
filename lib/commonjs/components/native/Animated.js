"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animated = void 0;
var _reactNative = require("react-native");
var _FlatList = require("./FlatList");
var _Image = require("./Image");
var _ScrollView = require("./ScrollView");
var _SectionList = require("./SectionList");
var _Text = require("./Text");
var _View = require("./View");
const Animated = exports.Animated = {
  ..._reactNative.Animated,
  View: _reactNative.Animated.createAnimatedComponent(_View.View),
  Text: _reactNative.Animated.createAnimatedComponent(_Text.Text),
  FlatList: _reactNative.Animated.createAnimatedComponent(_FlatList.FlatList),
  Image: _reactNative.Animated.createAnimatedComponent(_Image.Image),
  ScrollView: _reactNative.Animated.createAnimatedComponent(_ScrollView.ScrollView),
  SectionList: _reactNative.Animated.createAnimatedComponent(_SectionList.SectionList)
};
//# sourceMappingURL=Animated.js.map