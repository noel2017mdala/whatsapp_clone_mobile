import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "react-native-vector-icons/Ionicons";
export const HeaderTab = (props) => {
  return (
    <>
      <View style={[tw`pb-2`, styles.header]}>
        <View style={[tw`pt-6`, styles.iconsHeader]}>
          <View
            style={[
              tw`flex flex-row m-4`,
              {
                width: "100%",
              },
            ]}
          >
            <View style={[tw``]}>
              <TouchableOpacity
                onPress={() => {
                  props.navigateBack();
                }}
              >
                <BackIcon
                  name="arrow-back-outline"
                  size={25}
                  color="white"
                  style={[tw`mr-1`]}
                />
              </TouchableOpacity>
            </View>
            <View style={[tw``]}>
              <Text
                style={[
                  tw`text-white  text-2xl font-bold text-center`,
                  {
                    marginRight: "30%",
                  },
                ]}
              >
                {props.name ? props.name : "Whatsapp"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  header: {
    backgroundColor: "#128C7E",
  },

  iconsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icons: {
    flexDirection: "row",
  },
});
