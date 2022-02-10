import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const RepositoryInfo = ({ repository, path }) => {
  const headingStyles = [
    styles.text,
    styles.fontWeightBold,
    { marginBottom: 7 },
  ];

  return (
    <View
      style={{ padding: 20, backgroundColor: 'white' }}
      testID="repositoryItem"
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 15,
          paddingRight: 20,
        }}
      >
        <View
          style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10 }}
        >
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={{ height: '100%', width: '100%', borderRadius: 10 }}
          />
        </View>

        <View style={{}}>
          <Text style={headingStyles}>{repository.fullName}</Text>
          <Text style={{ ...styles.text, marginBottom: 7, paddingRight: 6 }}>
            {repository.description}
          </Text>
          <View
            style={{
              alignSelf: 'baseline',
              borderRadius: 7,
              backgroundColor: '#0365D0',
              padding: 10,
            }}
          >
            <Text style={{ color: '#fff' }}>{repository.language}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <Text style={{ fontWeight: '700', textAlign: 'center' }}>
            {prettyThousand(repository.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>

        <View>
          <Text style={{ fontWeight: '700', textAlign: 'center' }}>
            {prettyThousand(repository.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>

        <View>
          <Text style={{ fontWeight: '700', textAlign: 'center' }}>
            {prettyThousand(repository.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>

        <View>
          <Text style={{ fontWeight: '700', textAlign: 'center' }}>
            {prettyThousand(repository.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>

      {path ? (
        <Pressable
          onPress={() => {
            WebBrowser.openBrowserAsync(`${repository.url}`);
          }}
          style={{
            borderRadius: 7,
            backgroundColor: '#0365D0',
            padding: 10,
            marginTop: 20,
            width: '100%',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            Open in GitHub
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryInfo;

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

export const prettyThousand = (num) => {
  if (num > 999) {
    return (num / 1000).toFixed(1) + 'k';
  }

  return num;
};
